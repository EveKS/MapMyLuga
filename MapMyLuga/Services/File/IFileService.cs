using System.Collections.Generic;
using System.Threading.Tasks;
using Birthdays.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using MapMyLuga.Models.Map;

namespace Controllers.Services.File
{
    public interface IFileService
    {
        Task<IFormFileCollection> UppFiles(IFormFileCollection file, List<FileDetail> fileDetailList, IHostingEnvironment _appEnvironment);
    }
}