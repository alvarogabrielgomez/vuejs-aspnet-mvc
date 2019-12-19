using VuejsAspNet.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Security.Cryptography;
using System.Web.Mvc;
using VuejsAspNet.Comum;

namespace VuejsAspNet.Controllers
{
    public class AjaxController : Controller
    {
        private TEST01 TEST01 = new TEST01();
        private TEST02 TEST02 = new TEST02();

        public ActionResult TestConnection()
        {
            var TEST01State = false;
            var TEST02State = false;
            var queryTEST01 = "SELECT 1 from Tabla1";
            var queryTEST02 = "SELECT 1 from Tabla2";

            using (SqlCommand cmd = new SqlCommand(queryTEST01, new SqlConnection(ConfigurationManager.ConnectionStrings["TEST01"].ToString())))
            {
                try
                {
                    cmd.Connection.Open(); // abre conexion
                    SqlDataReader rdr = cmd.ExecuteReader();
                    if (rdr.HasRows) // noresultados
                    {
                        TEST01State = true;
                    }
                }
                catch (Exception e)
                {
                    TEST01State = false;
                }

            }

            using (SqlCommand cmd = new SqlCommand(queryTEST02, new SqlConnection(ConfigurationManager.ConnectionStrings["TEST02"].ToString())))
            {
                try
                {
                    cmd.Connection.Open(); // abre conexion
                    SqlDataReader rdr = cmd.ExecuteReader();
                    if (rdr.HasRows) // noresultados
                    {
                        TEST02State = true;
                    }
                }
                catch (Exception e)
                {
                    TEST02State = false;
                }

            }


            var result = Json(new
            {
                TEST01State,
                TEST02State
            }, JsonRequestBehavior.AllowGet);

            return result;
        }
        public ActionResult Authenticate(string CARNET)
        {
            var user = new Usuarios().selectPorCarnet(CARNET, TEST01);

            if (user != null)
            {

                string token = "token";

                return Json(new
                {
                    success = true,
                    user.NOMBRE,
                    user.CODIGOUSUARIO,
                    token
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Response.TrySkipIisCustomErrors = true;
                Response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
                return Json(new
                {
                    success = false,
                    errors = "Not Found"
                }, JsonRequestBehavior.AllowGet);
            }


        }
        public ActionResult users()
        {
            var users = new Usuarios().selectTodo(TEST01);

            return Json(new
            {
                users
            }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult user(int codigousuario)
        {
            var user = new Usuarios().selectPorCodigoUsuario(codigousuario, TEST01);

            return Json(new
            {
                user
            }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SelectNOMBRE(string CARNET)
        {
            var user = new Usuarios().selectPorCarnet(CARNET, TEST01);
            var exists = false;
            if (user != null)
            {
                exists = true;
            }
            else
            {
                user = new Usuarios();
                user.NOMBRE = "";
            }

            return Json(new
            {
                user.NOMBRE,
                exists
            }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult dataHoraServer()
        {
            var datahora = new DataHoraAtual().select();

            return Json(new
            {
                datahora
            }, JsonRequestBehavior.AllowGet);
        }
    }
}