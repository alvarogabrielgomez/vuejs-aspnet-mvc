using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VuejsAspNet.Models
{
    public class DataHoraAtual
    {
        private TEST01 TEST01 = new TEST01();
        private TEST02 TEST02 = new TEST02();
        public string data { get; set; }
        public string hora { get; set; }

        public DataHoraAtual select()
        {
            DataHoraAtual r = TEST02.Database.SqlQuery<DataHoraAtual>("SELECT CONVERT(CHAR(8),GETDATE(),108) as hora, CONVERT(CHAR(10), GETDATE(), 103) as data").AsEnumerable().FirstOrDefault();
            return r;
        }
    }
}