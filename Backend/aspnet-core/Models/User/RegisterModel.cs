namespace core.Models.User
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterModel : BaseUserModel
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
