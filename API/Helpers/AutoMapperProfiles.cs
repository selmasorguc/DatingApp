using System.Linq;
using API.Controllers.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
           

            CreateMap<AppUser, MemberDTO>()
           .ForMember(dest => dest.PhotoUrl, 
            opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
           .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
            .ForMember(dest => dest.Interests, opt => opt.MapFrom(src => src.Interests))  
            .ForMember(dest => dest.KnownAs, opt => opt.MapFrom(src => src.KnownAs))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id)); 
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<MemberUpdateDto, MemberDTO>();

        }
    }
}