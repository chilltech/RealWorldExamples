using System.Threading.Tasks;

namespace WebApi.Services
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendEmailConfirmationAsync(string email, string link);
    }
}
