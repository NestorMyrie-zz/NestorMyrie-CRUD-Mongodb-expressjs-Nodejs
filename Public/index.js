window.onload = () => {
  var UserList = document.querySelector(".userslist");
  var formulario = document.getElementById("form");
  var Nombre = document.getElementById("Nombre");
  var edad = document.getElementById("Edad");
  function CargarTodo() {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        UserList.innerHTML = `
        <h1>Usuarios</h1>
        <div class='rowinfo'> <p>Nombre</p> <p>Edad</p></div>
        
        `;
        data.map((e) => {
          UserList.innerHTML += `
          
            <div class="list">
            
                <input type="text" value="${e.Nombre}" id='nm${e._id}nm' disabled>
                <input type="text" value="${e.Edad}"  id="ed${e._id}ed"  disabled>
                <a id ='${e._id}' class="fas fa-trash-alt pr" ></a>
                <a class="fas fa-pen" id='${e._id}edit'></a>
                <i class="far fa-save" id="saveelementorow${e._id}"></i>
            </div>
            `;
        });

        data.map((e) => {
          var id = e._id;
          var elemento = document.getElementById(id);
          elemento.addEventListener("click", (e) => {
            var confirmar = confirm("Seguro quires elimiar aeste usuario ?");
            if (confirmar) {
              fetch("/delete/" + e.target.id, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });

              CargarTodo();
            }
          });
        });

            //Aca creo variables para cada elemento iterable para
             //que al hacer click me permita editar un elemento en concreto

        data.map((e) => {

            var nm = 'nm' +e._id +'nm'
            var idedit = e._id +'edit'
            var edt= 'ed'+ e._id + 'ed'
           var namedit= document.getElementById(nm)
           var edadEdit= document.getElementById(edt)
           var elemento = document.getElementById(idedit)
            var saveelementorow = "saveelementorow" + e._id
            var save = document.getElementById(saveelementorow)
           elemento.addEventListener('click',() => {
              namedit.removeAttribute('disabled')
              namedit.focus()
              edadEdit.removeAttribute('disabled')
             save.style.setProperty('display','block')

            })

            save.addEventListener('click',(a) => {
              fetch('/update/'+e._id+'/'+namedit.value,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                
              })
              CargarTodo()
            })
        })
      });
  }
  CargarTodo();

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (Nombre.value.length > 1) {
      fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nombre: Nombre.value, Edad: Number(edad.value ? edad.value:17) }),
      })
        .then((res) => res.json())
        .then((data) => {
          CargarTodo();
        });
    }
    formulario.reset()
  });
};
