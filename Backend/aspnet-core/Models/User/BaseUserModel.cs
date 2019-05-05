using System.ComponentModel.DataAnnotations;

namespace core.Models.User
{

    public class BaseUserModel : BaseModel
    {
        [EmailAddress]
        public string Email { get; set; }

        public virtual string Id { get; set; }

        public virtual string Username { get; set; }

    }
}
