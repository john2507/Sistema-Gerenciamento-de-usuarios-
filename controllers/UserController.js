class UserController{



    constructor(formIdCreate, formIdUpdate, tableId){
      
        this.formEl  = document.getElementById(formIdCreate);
        this.formUpdateEl  = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId); 

        this.onSubmit();
        this.onEdit();
        this.selectAll();
    }


    // no clik do botao cancelar 
onEdit(){
  
    //localizando o formulario 
    document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

        this.showPanelCreate();

    });

    this.formUpdateEl.addEventListener("submit", event =>{

    event.preventDefault();

    // para o botao para nao ficar clicando
    let btn = this.formUpdateEl.querySelector("[type=submit]");

    btn.disabled = true;

    let values = this.getValue(this.formUpdateEl);

    let index = this.formUpdateEl.dataset.trIndex;

    let tr = this.tableEl.rows[index];

    let userOld = JSON.parse(tr.dataset.user);

    let result = Object.assign({}, userOld, values);

            this.getPhoto(this.formUpdateEl).then(
                (content)=>{

                    if(!values.photo) {
                        result._photo = userOld._photo;
                    }else{
                        result._photo = content;
                    };

                    let user = new User();
                    user.loadFromJSON(result);
                
                    user.save();

                    this.getTr(user, tr);
                        
                    this.updateCount();
    
                    this.formUpdateEl.reset();
    
                    btn.disabled = false;

                    this.showPanelCreate();
            },  
            
                (e)=>{
                    console.erro(e);
    
                }
            )        
    });
};


//botao salvar no clique do botao
 onSubmit(){

    this.formEl.addEventListener("submit", event => {

        event.preventDefault();

        let btn = this.formEl.querySelector("[type=submit]");
        
        btn.disabled = true;

        let values = this.getValue(this.formEl);
        // dizendddo que o value é falso para entra a foto
        if(!values){
            return false;
        }

        this.getPhoto(this.formEl).then(
            (content)=>{

                values.photo = content;
               

                values.save();

                // metodo adiciona uma nova linha e values sao os valores que adiciona
                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;
        },  
        
            (e)=>{
                console.erro(e);

            }
        )        

    });
 }   

 // metodo para carregar a foto
 getPhoto(formEl){

    return new Promise ((resolve, reject)=>{
        let fileReader = new FileReader();
     
        let elements = [...formEl.elements].filter(item =>{
   
           if (item.name === "photo"){
               return item;
           }
        })
   
        let file = elements[0].files[0];
   
        fileReader.onload  = ()=>{
   
            resolve(fileReader.result);
        };

        fileReader.onerror = (e)=>{
            reject(e);
        };

        if(file){
        fileReader.readAsDataURL(file);
        }else{
            resolve('dist/img/boxed-bg.jpg');
        }
    });

    
 }


getValue(formEl){

    // criando a variavel json
    let user = {};
    let isValid = true;
    //pegando o formulario campo e index para pecorrer 

    [...formEl.elements].forEach(function(field, index){

        // validando campo se 
        if(['name','email','password'].indexOf(field.name) > -1 && !field.value){
             
            // acessando o pai da classe form-group
            field.parentElement.classList.add('has-error');
            isValid = false;
        }


        if (field.name == "gender"){
          
            if (field.checked){
           
                user[field.name] = field.value;
            }
            
        } else if (field.name == "admin") {
            
            user[field.name] = field.checked;
        
        }else{
            user[field.name] = field.value;
        }
    });

    if(!isValid){
        return false;
    }

    return new User(

        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin
    )
    //--- pq so usamos ela aqui podesmo retorna na intancia dela 
  //  return objectUser;
}

getUsersStorage(){
    
    let users = [];

    if(localStorage.getItem("users")){
      
     users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
}


// listar toos os dados que ja estao amarzenado no ssesion
selectAll(){

    let users = this.getUsersStorage();

    users.forEach(dataUser => {

        let user = new User();

        user.loadFromJSON(dataUser);

        this.addLine(user);
    });
   
};

// metodo para inserir sessionStorage
// insert(data){

//     let users = this.getUsersStorage();

//         users.push(data);

//     //sessionStorage.setItem("users", JSON.stringify(users)); 
//     localStorage.setItem("users", JSON.stringify(users)); 

// }

// metodo para adicionar na linha os campos
addLine(dataUser){

   let tr = this.getTr(dataUser)
   
    this.tableEl.appendChild(tr);

    this.updateCount();
 };

getTr(dataUser, tr = null){

    if(tr==null) tr = document.createElement('tr');

    tr.dataset.user = JSON.stringify(dataUser);

    tr.innerHTML =  
//<td>${dataUser.registro.getDate()}/${dataUser.registro.getMonth()+1}/${dataUser.registro.getFullYear()}</td>
    `
    <tr>
                     <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                     <td>${dataUser.name}</td>
                     <td>${dataUser.email}</td>
                     <td>${(dataUser.admin) ? 'SIM' : 'NÃO'}</td>
                     <td>${Utils.dateFormat(dataUser.register)}</td>
                     <td>
                       <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                       <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                     </td>
                   </tr>
 
                 </tbody>
    ` ;
    this.addEventsTr(tr);
    return tr;
}

 addEventsTr(tr){

// localizando o botao de exluir
tr.querySelector(".btn-delete").addEventListener("click", e=>{

    if (confirm("Deseja Realmente Excluir?"));{

        tr.remove();
        this.updateCount();
    }
});


// localizano o botao de eddditar 
    tr.querySelector(".btn-edit").addEventListener("click", e=>{
        
        
        let json = JSON.parse(tr.dataset.user);
       //let form = document.querySelector("#form-user-update");
        
        this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;


        for (let name in json){
            
            let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");
            
            if(field){

                switch(field.type){

                    case 'file':
                    continue;
                    break;

                    case 'radio':
                    field = this.formUpdateEl.querySelector("[name=" + name.replace("_", " ") + "][value=" + json[name] + "]");
                    field.checked = true;   
                    break;

                    case 'checkbox':
                    field.checked = json[name];
                    break;

                    default:
                    field.value = json[name];
                }


               
            }
            
        }
        this.formUpdateEl.querySelector(".photo").src = json._photo;
        this.showPanelUpdate();
    
    });
 }

 showPanelCreate(){
    document.querySelector("#box-user-create").style.display ="block";
    document.querySelector("#box-user-update").style.display ="none"
 }
 showPanelUpdate(){
    document.querySelector("#box-user-create").style.display ="none";
    document.querySelector("#box-user-update").style.display ="block";
 }

updateCount(){
    
    let numberUsers = 0;
    let numberAdmin = 0;
    
    // fazendo um foreach colocando dentro de um array convertendo, Spread ele pega total do array e distribui certinho no array
    [...this.tableEl.children].forEach(tr=>{

        numberUsers++;
        let user = JSON.parse(tr.dataset.user);

        if(user._admin)numberAdmin++;
        
    });

    document.querySelector("#number-Users").innerHTML = numberUsers;
    document.querySelector("#number-Admin").innerHTML = numberAdmin;

}


}