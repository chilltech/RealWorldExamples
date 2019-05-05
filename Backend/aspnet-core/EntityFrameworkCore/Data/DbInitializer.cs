using core.EntityFrameworkCore.Entities;
using core.Models.User;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace core.EntityFrameworkCore.Data
{
    public class DbInitializer : IDbInitializer
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public DbInitializer(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            this._context = context;
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        public async Task<bool> Initialize()
        {

            this._context.Database.EnsureCreated();

            if (this._context.Roles.Any(x => x.Name == UserRoles.Administrator))
            {
                return true;   // DB has been seeded
            }

            await this._roleManager.CreateAsync(new IdentityRole { Name = UserRoles.Administrator });

            string userId = "90ec7f65-9f42-421f-a34f-bf10efe2e2de";
            string userName = "admin@email.com";
            string password = "P@ssw0rd";
            string fName = "John";
            string lName = "Doe";

            await this._userManager.CreateAsync(new ApplicationUser { Id = userId, Email = userName, UserName = userName, EmailConfirmed = true, FirstName = fName, LastName = lName }, password);

            var user = await this._userManager.FindByIdAsync(userId);

            await this._userManager.AddToRoleAsync(user, UserRoles.Administrator);

            return true;
        }
    }
}