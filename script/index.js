let userController = new UserController("form-user-create","form-user-update","table-user");


































/*// pegando todo o formulario com variavel e seus ID
// document.querySelector = pega o campo do formulario Id
var name        = document.querySelector("#exampleInputName");
var gender      = document.querySelector("#form-user-create [name=gender]:checked");
var birth       = document.querySelector("#exampleInputBirth");
var country     = document.querySelector("#exampleInputCountry");
var email       = document.querySelector("#exampleInputEmail1");
var password    = document.querySelector("#exampleInputPassword1");
var photo       = document.querySelector("#exampleInputFile");
var admin       = document.querySelector("#exampleInputAdmin");


// pegando todo o meu campo do formulario com o campo nome e pecorrendo e mostrando o campo e o index

var fields = document.querySelectorAll("#form-user-create [name]");

// trabalhando com jason
var user = {};


function addLine(dataUser){


   // console.log(dataUser);
// interpreta um comando onde nao é uma string 
document.getElementById("table-user").innerHTML = 
   `
   <tr>
                    <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${dataUser.admin}</td>
                    <td>${dataUser.birth}</td>
                    <td>
                      <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                  </tr>

                </tbody>
   ` 
   
}

  // clique do botao farrendo todo ele
  document.getElementById("form-user-create").addEventListener("submit", function(event){

    //para nao atualizar a pagina ao clike do botão 
    event.preventDefault();

    // pecorrendo meu formulario com o campo e index
    fields.forEach(function(field, index){

        // se o meu sexo for igual a o nome do campo e estiver marcado traga sim e mostre o campo, senao escreva não
        if (field.name == "gender"){

            if(field.checked){
                // peganddo o campo e os valores jason
                user[field.name] = field.value;
            }
        
        } else {
              user[field.name] = field.value;
        }
        
        });

        var objectUser = new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
            )

            addLine(objectUser);
          //console.log(user);

  });*/