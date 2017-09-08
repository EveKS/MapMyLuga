using Birthdays.Models;
using MapMyLuga.Models.Map;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Controllers.Services.File
{
    class FileService : IFileService
    {
        async Task<IFormFileCollection> IFileService.UppFiles(IFormFileCollection file,
            List<FileDetail> fileDetailList,
            IHostingEnvironment _appEnvironment)
        {
            var filePath = _appEnvironment.WebRootPath + "/Files/";
            var filesNames = new DirectoryInfo(filePath)
                .EnumerateFiles()
                ?.Select(f => f.Name)
                .ToList();

            IFormFileCollection uploadedFiles = file;
            foreach (var uploaded in uploadedFiles)
            {
                if (uploaded != null)
                {
                    string fileName = CreateName(filesNames, uploaded);

                    using (var fileStream = new FileStream(filePath + fileName, FileMode.Create))
                    {
                        await uploaded.CopyToAsync(fileStream);
                    }

                    fileDetailList.Add(new FileDetail
                    {
                        Name = uploaded.FileName,
                        Path = "/Files/" + fileName
                    });

                    filesNames.Add(fileName);
                }
            }

            return uploadedFiles;
        }

        private string CreateName(List<string> filesNames, IFormFile uploaded)
        {
            var fileNameToChar = Enumerable.Range('a', 'z' - 'a')
                .Select(Convert.ToChar)
                .ToArray();

            var fileExtension = Path.GetExtension(uploaded.FileName);

            var fileName = "";
            do
            {
                Sorting(fileNameToChar);
            } while (filesNames.Contains(fileName = new string(fileNameToChar) + fileExtension));

            return fileName;
        }

        /// <summary>
        /// Создаем рандомное имя
        /// </summary>
        /// <param name="list"></param>
        private void Sorting(IList<char> list)
        {
            Random rnd = new Random();
            for (int i = list.Count - 1; i > 0; i--)
            {
                int j = rnd.Next(0, i + 1);
                char temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
}
