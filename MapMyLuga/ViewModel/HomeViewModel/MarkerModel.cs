using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.ViewModels
{
    public class MarkerModel
    {
        [HtmlAttributeNotBound]
        public string UserName { get; set; }

        public IFormFileCollection UploadedFiles { get; set; }
        [HtmlAttributeNotBound]
        public string MarkerGroupId { get; set; }
        [HtmlAttributeNotBound]
        public string MarkerTitle { get; set; }

        [Required(ErrorMessage = "Необходимо ввести текст сообщения")]
        [HtmlAttributeNotBound]
        public string MarkerDescription { get; set; }
        [HtmlAttributeNotBound]
        public string DataAdd { get; set; }
        [HtmlAttributeNotBound]
        public string MarcerCoordinate { get; set; }
        [HtmlAttributeNotBound]
        public string ObjectColor { get; set; }
    }
}
