$.getJSON('/home/GetTodos', function (r) {
    todoListesi = r;
    
    init();
})

var todoListesi = [];

function init() {
    for (var todoItem of todoListesi) {

       
        // string format -- backtick ``
        var cssClass = "";
        if (todoItem.completed) {
            cssClass = "done"
        }
       
        $("#todoList").append(` <button type="button" class="list-group-item list-group-item-action ${cssClass}" data-ld="${todoItem.id}"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">${todoItem.todo}<input type="checkbox" class="todo-item" style="margin-left:auto;" ${(todoItem.completed ? "checked" : "")}></button>`);

    }
}

var todoAdd = $("#task");
var filter = $("#filter");
var todoForm = $("#taskForm");
// function clearall() {
//     $("#todoList").empty();

//     filter.val("");
// }

// $("#clear").click(clear);

/*$("#ekle").focus();*/

$("#taskForm").on("submit", function(x){
    x.preventDefault();

    if (todoForm.hasClass("isActive")) {  //e�er �ok say�da request i�lemi olursa i�erisinde ki isactive class� var is i�lem yapt�rmaz
        return;
    }

    todoForm.hasClass("isActive"); // eklenilen forma isactive class� ekler  
    $.post("/Home/AddTodo", { todo: todoAdd.val() }, function (r) {

        todoForm.removeClass("isActive"); // burada da girilen veri eklendi�i i�in art�k isactive class�n� kald�r�yoruz ki tekrardan input yap�labilisin
        $("#todoList").append(` <button type="button" class="list-group-item list-group-item-action" data-ld="${todoItem.id}">${todoItem.todo}<input type="checkbox" class="todo-item" style="margin-left:250px;"></button>`);
       
    todoAdd.val("");
    });

  
    $("#task").focus();

  });
  
$(filter).on('keyup', filterTask);

  $("#todoList").on("click", ".todo-item", function(){
    $(this).parent().toggleClass("done");
});

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    $('.list-group-item').each(function() {
      const item = $(this).text().toLowerCase();
      if (item.indexOf(text) !== -1) {
        $(this).addClass('d-flex').show();
      } else {
        $(this).removeClass('d-flex').hide();
      }
    });
  }

  $('#clear').on('click', function(){
      $(".todo-item:checked").parent().remove(); 
      $("#task").focus();
  });

$("#all").click(function () {
    $("input[type='checkbox']").prop('checked', true);
    $(".todo-item").parent().toggleClass("done");


});

//$("#clear").click(function (z) {
//    $.post("/Home/AddTodo", { todo: todoAdd.val() }, function (r) { 
//    var checkboxlar = $("input[type='checkbox']:checked"); // se�ili checkbox'lar� al�r

//    checkboxlar.each(function () {
//        var id = $(r.todoid)

//        // Ado.NET kullanarak DELETE iste�i olu�tur
//        var connection = new SqlConnection(" Server = 104.247.162.242\\MSSQLSERVER2017;Database=akadem58_sd;User Id = akadem58_sd; Password=Hfoe27!96;");
//        var command = new SqlCommand("DELETE FROM Todos WHERE id = @Id", connection);
//        command.Parameters.AddWithValue("@Id", id);

//        connection.Open();
//        command.ExecuteNonQuery();
//        connection.Close();

//        // Silinen checkbox'� sayfadan kald�r
//        $(".todo-item:checked").parent().remove();
//    });

//    });
//});



