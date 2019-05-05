using System.Threading.Tasks;

namespace WebApi.Services
{

    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class EmailSenderService : IEmailSenderService
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Task.CompletedTask;
        }

        public Task SendEmailConfirmationAsync(string email, string link)
        {
            return SendEmailAsync(email, "Confirm your email", $"Please confirm your account by clicking this link: <a href='{link}'>link</a>");
        }
    }
}
