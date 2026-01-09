import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NoteItem from "../../components/NoteItem";
import AddNoteModal from "../../components/AddNoteModal";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NoteScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  //load notes
  useEffect(() => {
    const loadNotes = async () => {
      const data = await AsyncStorage.getItem("notes");
      if (data) {
        setNotes(JSON.parse(data));
        console.log("notes from storage", JSON.parse(data));
      }
      setIsLoaded(true);
    };
    loadNotes();
    // clearAll();
  }, []);

  // set notes
  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    AsyncStorage.setItem("notes", JSON.stringify(notes));
    console.log("note sets");
  }, [isLoaded, notes]);

  const deleteNote = async (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    console.log("Note deleted with id", id);
  };

  const addNote = async () => {
    if (newNote.trim() === "") {
      return;
    }

    const tempNote = { id: Date.now().toString(), text: newNote };
    setNotes((prev) => [...prev, tempNote]);

    console.log("new note added", tempNote);

    setNewNote("");
    setModalVisible(false);
  };

  const clearAll = async () => {
    await AsyncStorage.setItem("notes", JSON.stringify([]));
  };

  return (
    <View style={styles.container}>
      {/* <Text>notes page</Text> */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <NoteItem note={item} deleteNote={deleteNote} setNotes={setNotes} />
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>

      {/* Modal */}

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      ></AddNoteModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,

    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
