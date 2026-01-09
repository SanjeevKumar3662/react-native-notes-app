import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function NoteItem({ note, deleteNote }) {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(note.id)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
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
});
