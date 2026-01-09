import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function NoteItem({ note, deleteNote, setNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateNode, setUpdateNote] = useState(note.text);
  console.log("item note", updateNode);

  const saveNote = async (note) => {
    if (updateNode.trim() === "") {
      return;
    }

    setNotes((prev) =>
      prev.map((item) => {
        if (item.id === note.id) {
          item.text = updateNode;
        }
        return item;
      })
    );

    setIsEditing(false);
  };

  return (
    <View style={styles.noteItem}>
      {!isEditing ? (
        <Text style={styles.noteText}>{note.text}</Text>
      ) : (
        <TextInput
          style={styles.input}
          value={updateNode}
          onChangeText={setUpdateNote}
        ></TextInput>
      )}

      {!isEditing ? (
        <View style={styles.crudContainer}>
          {/* edit button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.deleteButtonText}>Edit</Text>
          </TouchableOpacity>

          {/* delete button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteNote(note.id)}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => saveNote(note)}
        >
          <Text style={styles.deleteButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#d81e1eff",
    padding: 10,
    borderRadius: 5,

    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    flex: 1,
  },
  crudContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    // alignItems: "start",
    width: 120,
    padding: 10,
    borderWidth: 3,
    backgroundColor: "black",
  },
});
