using System.ComponentModel.DataAnnotations;

namespace API.Controllers.DTOs
{
    public class LoginDto
    {

        public string Username { get; set; }
        public string Password { get; set; }
    }
}