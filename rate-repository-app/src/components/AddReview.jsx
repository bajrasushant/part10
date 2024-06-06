import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondaryBackground,
    padding: 20,
    gap: 20,
  },
  inputTexts: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderColor: theme.colors.tertiaryBackground,
    borderRadius: 5,
    fontSize: theme.fontSizes.body,
  },
  textInvalid: {
    borderColor: theme.colors.errorColor,
  },
  submitButton: {
    backgroundColor: theme.colors.blueBackground,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontStyle: "italic",
  },
});

const AddReview = () => {
  const [createReview] = useCreateReview();
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
      .number("Rating must be a number")
      .min(1, "Min is 1.")
      .max(99, "Max is 99.")
      .required("Rating should be between 0 to 100"),
    text: yup.string().optional(),
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const review = await createReview({ variables: { review: values } });
        console.log(review);
        if (!review.errors) {
          navigate(`/aboutRepo/${review.createReview.repositoryId}`);
        }
      } catch (e) {
        console.error(e);
      }
      resetForm();
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        placeholder="Repository owner name"
        style={[styles.inputTexts]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={[styles.inputTexts]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        value={formik.values.rating}
        onChangeText={(text) => formik.setFieldValue("rating", Number(text))}
        keyboardType="numeric"
        style={[styles.inputTexts]}
        placeholder="Rating between 0 and 100"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        style={[styles.inputTexts]}
        placeholder="Review"
        multiline
      />
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" color="textSecondary">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default AddReview;
