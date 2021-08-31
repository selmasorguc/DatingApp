using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void UpdateProfile(MemberDTO user);

        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<MemberDTO> GetMemberAsync(string username);
        Task<IEnumerable<MemberDTO>> GetMembersAsync();

    }
}