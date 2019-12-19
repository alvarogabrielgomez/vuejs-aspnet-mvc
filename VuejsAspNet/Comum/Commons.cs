using VuejsAspNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VuejsAspNet.Comum
{
    public class Commons
    {
        public int porcentajeCompletado(decimal valoractual, decimal valorcompleto)
        {
            var porcentaje = 0M;
            var cien = 100M;
            valoractual = valoractual < 0 ? 0 : valoractual;

            var diff = valorcompleto - valoractual;

            if (valorcompleto > 0)
            {
            porcentaje = (diff * cien) / valorcompleto;
            }
            else
            {
                porcentaje = 0;
            }


            return Convert.ToInt32(porcentaje);
        }

    }
}