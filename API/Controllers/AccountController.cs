using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(SignInManager<User> signInManager) : BaseApiController
    {
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { Email = registerDto.Email, UserName = registerDto.Email };
            var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem(ModelState);
            }
            await signInManager.UserManager.AddToRoleAsync(user, "Member");
            return Ok();
        }


        [HttpGet("user-info")]
        public async Task<IActionResult> GetUserInfo()
        {
            if(User.Identity == null || !User.Identity.IsAuthenticated)
                return NoContent();
            
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var roles = await signInManager.UserManager.GetRolesAsync(user);
            return Ok(new { user.Email, user.UserName, Roles = roles });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
        {
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            if (user.Address == null)
            {
                user.Address = address;
            }
            else
            {
                user.Address.Name = address.Name;
                user.Address.Line1 = address.Line1;
                user.Address.Line2 = address.Line2;
                user.Address.City = address.City;
                user.Address.State = address.State;
                user.Address.PostalCode = address.PostalCode;
                user.Address.Country = address.Country;
            }

            var result = await signInManager.UserManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem(ModelState);
            }
            return Ok(user.Address);
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<Address>> GetSavedAddress()
        {
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            if (user.Address == null) return Ok(user);
            return Ok(user.Address);
        }
    }
}
