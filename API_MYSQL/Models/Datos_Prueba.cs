using System.ComponentModel.DataAnnotations;

namespace API_MYSQL.Models
{
    public class Datos_Prueba
    {
        [Key]
        public int id { get; set; }

        public string nombre { get; set; }

        public string ocupacion { get; set; }

        public int edad { get; set; }
    }
}
