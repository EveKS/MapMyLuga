using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MapMyLuga.TagHelpers
{
    public class HashtagTagHelper : TagHelper
    {
        [HtmlAttributeNotBound]
        public string Controller { get; set; }

        [HtmlAttributeNotBound]
        public string Action { get; set; }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "";
            var content = (await output.GetChildContentAsync());

            var decodeContent = WebUtility.HtmlDecode(content.GetContent());

            if (decodeContent.Contains('#'))
            {
                string pattern =
                    @"(?<hashtag>(\B)(#[\w\d_]+(?!([\w-]))))";
                string replacePattern = CreateHashTag("${hashtag}");

                var regex = new Regex(pattern, RegexOptions.Compiled);
                decodeContent = regex.Replace(decodeContent, replacePattern);
            }

            output.Content.SetHtmlContent(decodeContent);
        }

        protected string CreateHashTag(string hashTag)
        {
            var content = new HtmlContentBuilder()
                     .AppendHtml($"<a asp-area='' asp-controller='{Controller}' asp-action='{Action}' asp-route-hashTag='{hashTag}' class='btn btn-link btn-hashtag'>{hashTag}</a>");

            using (var writer = new StringWriter(CultureInfo.InvariantCulture))
            {
                content.WriteTo(writer, HtmlEncoder.Default);
                return writer.ToString();
            }
        }
    }
}
