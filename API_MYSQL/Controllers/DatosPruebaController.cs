
using API_MYSQL.Context;
using API_MYSQL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API_DE_PRUEBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatosPruebaController : ControllerBase
    {
        private readonly MyDbContext context;

        public DatosPruebaController(MyDbContext context)
        {
            this.context = context;
        }

        // Get
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.datos_prueba.ToList());
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetDatos")]
        public ActionResult Get(int id)
        {
            try
            {
                var datos = context.datos_prueba.FirstOrDefault(g => g.id == id);
                return Ok(datos);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Post
        [HttpPost]
        public ActionResult Post([FromBody]Datos_Prueba datos)
        {
            try
            {
                context.datos_prueba.Add(datos);
                context.SaveChanges();
                return CreatedAtRoute("GetDatos", new { id = datos.id }, datos);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //PUT
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Datos_Prueba datos)
        {
            try
            {
                if(datos.id == id)
                {
                    context.Entry(datos).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetDatos", new { id = datos.id }, datos);
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //DELETE
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var datos = context.datos_prueba.FirstOrDefault(d => d.id == id);   
                if (datos != null)
                {
                    context.datos_prueba.Remove(datos);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
