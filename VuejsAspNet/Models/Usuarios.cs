using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace VuejsAspNet.Models
{
    [Table(name: "Usuarios")]
    public class Usuarios
    {
        [Key]
        public int CODIGO { get; set; }
        public string SIGLA { get; set; }
        public string NOMBRE { get; set; }
        public int CODIGOUSUARIO { get; set; }
        public string CARNET { get; set; }
        public string SITUACION { get; set; }

        public Usuarios selectPorCarnet(string CARNET, TEST01 db)
        {
            var retorno = new Usuarios();

            if (CARNET == "1")
            {
                retorno.CARNET = CARNET;
                retorno.CODIGO = 1;
                retorno.CODIGOUSUARIO = 2;
                retorno.NOMBRE = "Test User";
                retorno.SIGLA = "TEST";
                retorno.SITUACION = "Activo";
            }
            else
            {
                retorno = null;
            }

            return retorno;
        }

        public Usuarios selectPorCodigoUsuario(int codigousuario, TEST01 db)
        {
            var retorno = new Usuarios();

            if (codigousuario == 2)
            {
                retorno.CARNET = CARNET;
                retorno.CODIGO = 1;
                retorno.CODIGOUSUARIO = 2;
                retorno.NOMBRE = "Test User";
                retorno.SIGLA = "TEST";
                retorno.SITUACION = "Activo";
            }
            else
            {
                retorno = null;
            }

            return retorno;
        }

        public List<Usuarios> selectTodo(TEST01 db)
        {
            var retorno = new List<Usuarios>();
            var ls = new List<Usuarios>();
            var ayyyy = new Usuarios();

            var query = db.Usuarios.Select(x => new { x.CODIGO, x.SIGLA, x.NOMBRE, x.CODIGOUSUARIO, x.CARNET, x.SITUACION }).ToList();

            foreach (var item in query)
            {
                ayyyy = new Usuarios()
                {
                    CODIGO = item.CODIGO,
                    SIGLA = item.SIGLA, 
                    NOMBRE = item.NOMBRE,
                    CODIGOUSUARIO = item.CODIGOUSUARIO,
                    CARNET = item.CARNET,
                    SITUACION = item.SITUACION
                };
                ls.Add(ayyyy);
            }

            return ls;
        }

    }


}