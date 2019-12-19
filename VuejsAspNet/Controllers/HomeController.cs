using VuejsAspNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VuejsAspNet.Controllers
{
    public class HomeController : Controller
    {
        private TEST01 TEST01 = new TEST01();
        private TEST02 TEST02 = new TEST02();

        public ActionResult Index()
        {
            ViewBag.Message = "Message from Controller";

            return View();
        }


    }
}