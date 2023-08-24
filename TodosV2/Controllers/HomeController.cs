using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Reflection;
using TodosV2.Models;

namespace TodosV2.Controllers
{
    public class HomeController : Controller
    {
        public string connectionString = " Server = 104.247.162.242\\MSSQLSERVER2017;Database=projemsi_002;User Id=projemsi_sd;Password=*****;";

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index() { 
            return View();
        }

        public IActionResult GetTodos()
        {
            var todoLists = new List<TodosList>();
            using(SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var command = new SqlCommand("Select Id, Todo, Completed, Created_on, Updated_on From Todos ORDER BY Created_on", connection);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {

                    todoLists.Add(
                        new TodosList
                        {
                            Id = reader.GetInt32(0),
                         Todo = reader.GetString(1),
                        Completed = reader.GetBoolean(2),
                        CreatedOn= reader.GetDateTime(3),
                        UpdateOn= reader.GetDateTime(4)

                        }
                          );
                        
                }

                        
                       
            }

            return Json(todoLists);
        }

        [HttpPost]
        public IActionResult AddTodo(string todo) 
        {
            if (string.IsNullOrEmpty(todo))
            {
                return Json(
                        new
                        {
                            success = false,
                            message = "Eklenemedi. Hata oldu. Git bir bak istersen. "
                        });
            }

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    var command = new SqlCommand(
                         "INSERT INTO Todos (Todo, Created_on, Updated_on) output INSERTED.id VALUES (@todo, @created_on, @updated_on)",
                        connection);
                    command.Parameters.AddWithValue("@todo", todo);
                    command.Parameters.AddWithValue("@created_on", DateTime.Now);
                    command.Parameters.AddWithValue("@updated_on", DateTime.Now);

                   int todoId = (int)command.ExecuteScalar();

                    return Json(
                        new
                        {
                            todoid = todoId,
                            success = true
                        }
                        );

                }
                catch (Exception e)
                {

                   
                    return Json(
                        new
                        {
                            success = false,
                            message = "Eklenemedi. Hata oldu."
                        });

                }
            }
           
        }

        [HttpPost]
        public IActionResult RemoveTodo(int todoId) 
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();

                    var command = new SqlCommand(
                            "DELETE FROM contents WHERE id = @id",
                            connection);

                    command.Parameters.AddWithValue("@id", todoId);

                    command.ExecuteNonQuery();

                   
                    return View();

                }
                catch (Exception e)
                {
                   
                }
            }
            return Content("0");

        }
    }

               
    }

       


    
