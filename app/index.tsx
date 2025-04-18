import React, { useState } from "react";
import { 
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Alert
} from "react-native";
import { Link } from "expo-router";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<string>(""); 
  const [treatment, setTreatment] = useState("");
  const [concern, setConcern] = useState("");
  const [buttonText, setButtonText] = useState("Save Profile");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

      /*
    validation function:
    Returns a boolean (true/false) indicating if the form is valid
    Creates a new errors object that will replace the existing one
    Checks each field and adds error messages if fields are empty
    Updates the errors state and returns the validation result
    */
   
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: {[key: string]: string} = {};
  
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    }
    
    if (!gender.trim()) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    
    if (!treatment.trim()) {
      newErrors.treatment = "Treatment information is required";
      isValid = false;
    }
    
    if (!concern.trim()) {
      newErrors.concern = "Concern information is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  /*
  The save button handler function:
  Calls validateForm() to check if all fields are filled
  Shows an alert if validation fails
  Logs the form data to console if validation passes
  Changes the button text to "Saved" to give visual feedback
  */

  const handleSave = () => {
    // Validate the form first
    if (!validateForm()) {
      // Show alert if validation fails
      Alert.alert("Incomplete Form", "Please fill in all fields before saving");
      return;
    }
    
    // Form is valid, proceed with saving
    console.log({ name, age, gender, treatment, concern });
    
    // Change button text to "Saved" instead of showing alert
    setButtonText("Saved");
  };

  /*
  The component's return section:
  Uses SafeAreaView to respect device notches and home indicators
  Makes the content scrollable with ScrollView
  Creates a card-like container for the form
  Renders form fields (name, age, gender, treatment, concern)
  Creates a save button that changes color when in "Saved" state
  Adds a separator line
  Adds a navigation link to the Voice Agent screen
  */

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Text style={styles.title}>Profile</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) {
                  setErrors({...errors, name: ""});
                }
                if (buttonText === "Saved") setButtonText("Save Profile");
              }}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[styles.input, errors.age ? styles.inputError : null]}
              value={age}
              onChangeText={(text) => {
                setAge(text);
                if (errors.age) {
                  setErrors({...errors, age: ""});
                }
                if (buttonText === "Saved") setButtonText("Save Profile");
              }}
              placeholder="Enter your age"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={[styles.input, errors.gender ? styles.inputError : null]}
              value={gender}
              onChangeText={(text) => {
                setGender(text);
                if (errors.gender) {
                  setErrors({...errors, gender: ""});
                }
                if (buttonText === "Saved") setButtonText("Save Profile");
              }}
              placeholder="Enter your gender"
              placeholderTextColor="#999"
            />
            {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Treatment</Text>
            <TextInput
              style={[
                styles.input, 
                styles.treatmentInput, 
                errors.treatment ? styles.inputError : null
              ]}
              value={treatment}
              onChangeText={(text) => {
                setTreatment(text);
                if (errors.treatment) {
                  setErrors({...errors, treatment: ""});
                }
                if (buttonText === "Saved") setButtonText("Save Profile");
              }}
              placeholder="Describe the recent treatment you've undergone"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
            {errors.treatment ? <Text style={styles.errorText}>{errors.treatment}</Text> : null}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Concern</Text>
            <TextInput
              style={[
                styles.input, 
                styles.concernInput, 
                errors.concern ? styles.inputError : null
              ]}
              value={concern}
              onChangeText={(text) => {
                setConcern(text);
                if (errors.concern) {
                  setErrors({...errors, concern: ""});
                }
                if (buttonText === "Saved") setButtonText("Save Profile");
              }}
              placeholder="What was this treatment for? Describe your concern"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
            {errors.concern ? <Text style={styles.errorText}>{errors.concern}</Text> : null}
          </View>
          
          <TouchableOpacity 
            style={[
              styles.saveButton,
              buttonText === "Saved" ? styles.savedButton : {}
            ]} 
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>{buttonText}</Text>
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <Link href="/nurse-agent" asChild>
            <TouchableOpacity style={styles.voiceAgentButton}>
              <Text style={styles.voiceAgentButtonText}>Try Voice Assistant</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center", // Center horizontally
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "100%", // Take full width of container
    maxWidth: 500, // Maximum width for larger screens
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
    color: "#333",
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    width: "100%",
  },
  inputError: {
    borderColor: "#e53935", // Red border for error state
    backgroundColor: "#ffebee", // Light red background for error state
  },
  errorText: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
  },
  treatmentInput: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: "top", // This helps on Android
  },
  concernInput: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#4a90e2",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  savedButton: {
    backgroundColor: "#4caf50", // Green color for "Saved" state
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 25,
    width: "100%",
  },
  voiceAgentButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dadce0",
  },
  voiceAgentButtonText: {
    color: "#5f6368",
    fontSize: 16,
    fontWeight: "500",
  },
});
