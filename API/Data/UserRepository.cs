using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        public DataContext _context;
        public IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users.
            Where(user => user.UserName == username)
            .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            return await PagedList<MemberDTO>.CreateAsync(query.ProjectTo<MemberDTO>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber, userParams.PageSize);
        }

        async Task<AppUser> IUserRepository.GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        Task<AppUser> IUserRepository.GetUserByUsernameAsync(string username)
        {
            return _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(u => u.UserName == username);
        }

        async Task<IEnumerable<AppUser>> IUserRepository.GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        async Task<bool> IUserRepository.SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        void IUserRepository.UpdateProfile(MemberDTO user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }



    }
}