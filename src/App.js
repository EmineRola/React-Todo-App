import React from "react";
import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/todo";
import Modal from "./components/moodal";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodaText] = useState("");
  const [showModal, setShowmodal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});

  //ekle butonuna tıklanınca yeni todo oluşturur.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText) {
      toast.warn("Formu doldurun!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    //todo için gerekli bilgileri içeren obje oluşturma
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };
    //oluşturulan todo objesiini todolar statine aktarma
    //spread opertorle ... todos önceden eklenenleri muhafaza ettik
    setTodos([...todos, newTodo]);
    setTodaText("");
  };
  //silme butonuna tıklandığında çalışır
  //todo dizisini gezer ve id si siliecek todonun idsini eşit olmayanları döndürür
  const handleDelete = (deletedTodo) => {
    const filtred = todos.filter((item) => item.id !== deletedTodo.id);

    setTodos(filtred);
    //bildirim verme
    toast.warn("Toddo kaldırıldı!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  //yapıldı butonuna tıklanıldığında çalışır.
  //1-düzenlenecek todonun dizideki sırasını bulma
  //2-düzenlenecek todonun isDone değerini tersine çevirme
  //3-todoyu diziden çıkarıp yerine düzenlenmiş halini koyma
  //4-todolar dizisinin bir kopyasını oluşturup onu güncelledik
  //5-güncellenen kopyayı todoların yeni değeri olarak tanımladık
  const handleDone = (completedTodo) => {
    const index = todos.findIndex((item) => item.id === completedTodo.id);
    //todos içerisindeki benim seçtiğim todonun sırasına  ulaştım
    const newValue = !todos[index].isDone;
    //todos içerisindeki benim todomun isDone nı değiştirdim

    const changedTodo = { ...completedTodo, isDone: newValue };
    //güncellediğim değeri todoya aktardım

    const newTodos = [...todos];
    //state değiştirmek yerine bir kopyasını oluşturduk

    newTodos.splice(index, 1, changedTodo);
    //ardından o kopyayı güncelliyoruz
    setTodos(newTodos);
  };
  //herhangi bir diziden bir elemanı bulup çıkarma ve  yerine yenisi ekleme yöntemi

  //edit save butonuna tıklandığında  yeni değerleri değişen objeyi diziye  aktarma
  const handleSaveEdit = () => {
    if (!editingTodo.title) {
      toast.warn("Başlık boş bırakılamaz!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    //splice için değişecek elemanın dizideki yerini bulduk (indexi)
    let index = todos.findIndex((item) => item.id === editingTodo.id);
    //direkt olarak statei değiştirmek yerine todo dizisinin bir kopyasını oluşturduk
    const cloneTodos = [...todos];

    //dizinin güncelleneek todoyu çıkarıp yerine editlenmiş todoyu ekledik
    cloneTodos.splice(index, 1, editingTodo);
    //ekrana bastığımız diziyi klonladığımız diziyle değiştirdik
    setTodos(cloneTodos);
    //kaydedildikten sonra modalı kapatma
    setShowmodal(false);

    //ekrana bildirim gönderme
    toast.success("Todo başarıyla güncellendi", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="bg-dark">CRUD</h1>
      <div className="container border p-4 mt-4">
        <form onSubmit={handleSubmit} className="d-flex gap-3">
          <input
            className="form-control"
            type="text"
            placeholder="Yapılacakları giriniz..."
            value={todoText}
            onChange={(e) => {
              setTodaText(e.target.value);
            }}
          />
          <button className="btn btn-warning btn-lg">Ekle</button>
        </form>
        <div className=" text-left d-flex flex-column gap-3 py-5">
          {/* eğer state içerisi boş ise ekrana yapılacak yok basıyoruz */}
          {todos.length === 0 && (
            <h4 className="text-center"> Yapılacak herhangi bir işimiz yok.</h4>
          )}

          {/* eğer state içerisinde eleman varsa elemanları ekrana basıyoruz */}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowmodal={setShowmodal}
              setEditingTodo={setEditingTodo}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          setShowmodal={setShowmodal}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
