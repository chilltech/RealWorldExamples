using System.Threading.Tasks;

namespace core.EntityFrameworkCore.Data
{
    public interface IDbInitializer
    {
        Task<bool> Initialize();
    }
}