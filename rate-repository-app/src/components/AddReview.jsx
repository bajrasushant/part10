import { Alert, StyleSheet, View } from "react-native";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import theme from "./theme";
import { useEffect } from "react";
import FormikTextInput from "./FormikTextInput";
import SubmitButton from "./SubmitButton";
import { Formik } from "formik";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondaryBackground,
    padding: 20,
  },
});

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

const AddReview = () => {
  const [createReview, result] = useCreateReview();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.data && result.data.createReview) {
      navigate(`/aboutRepo/${result.data.createReview.repositoryId}`);
    }
  }, [result.data]);

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const handleSubmit = async (values) => {
    try {
      await createReview({
        variables: {
          review: {
            ...values,
            rating: Number(values.rating),
          },
        },
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
          />
          <FormikTextInput name="text" placeholder="Review" multiline />
          <SubmitButton title="Create a review" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default AddReview;
