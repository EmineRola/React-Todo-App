const Modal = ({
  editingTodo,
  setEditingTodo,
  setShowmodal,
  handleSaveEdit,
}) => {
  return (
    <div className="modal-wrapper">
      <div className="edit-modal">
        <h4>Yeni Değeri Giriniz..</h4>
        <input
          value={editingTodo.title}
          onChange={(e) =>
            setEditingTodo({
              ...editingTodo,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
          type="text"
        />
        <button
          className="btn btn-danger w-25"
          onClick={() => setShowmodal(false)}
        >
          İptal et
        </button>
        <button className="btn btn-info w-25" onClick={handleSaveEdit}>
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default Modal;
