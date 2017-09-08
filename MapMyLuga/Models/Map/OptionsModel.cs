using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Birthdays.Models
{
    public class OptionsModel
    {
        [Key]
        public string OptionsModelId { get; set; }

        public string WontSubscribeText { get; set; }
        public string ChangeSubscribeText { get; set; }
        public string UnsubscribeText { get; set; }
        public string NotUnsubscribeText { get; set; }
        public string SelectSubscribeText { get; set; }


        public int DefoltTimeZone { get; set; }
    }
}
