import { getReviewById, createReview, updateReview, deleteReview } from "../models/reviewModel.js";

async function submitReview(req, res) {
  const vehicleId = req.params.id;
  const { rating, comment } = req.body;
  const ratingNumber = Number(rating);

  if (!comment || comment.trim() === "" || !ratingNumber || ratingNumber < 1 || ratingNumber > 5) {
    req.flash("error", "Please provide a rating (1-5) and a comment.");
    return res.redirect(`/vehicle/${vehicleId}`);
  }

  const review = await createReview({
    userId: req.session.user.id,
    vehicleId,
    rating: ratingNumber,
    comment: comment.trim()
  });

  if (!review) {
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect(`/vehicle/${vehicleId}`);
  }

  req.flash("success", "Thank you for your review!");
  res.redirect(`/vehicle/${vehicleId}`);
}

async function buildEditReview(req, res) {
  const reviewId = req.params.id;
  const review = await getReviewById(reviewId);

  if (!review || review.userId !== req.session.user.id) {
    req.flash("error", "You cannot edit this review.");
    return res.redirect("/");
  }

  res.render("pages/edit-review", { title: "Edit Review", review });
}

async function submitEditReview(req, res) {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  const review = await getReviewById(reviewId);

  if (!review || review.userId !== req.session.user.id) {
    req.flash("error", "You cannot edit this review.");
    return res.redirect("/");
  }

  const ratingNumber = Number(rating);

  if (!comment || comment.trim() === "" || !ratingNumber || ratingNumber < 1 || ratingNumber > 5) {
    req.flash("error", "Please provide a rating (1-5) and a comment.");
    return res.redirect(`/reviews/${reviewId}/edit`);
  }

  await updateReview(reviewId, { rating: ratingNumber, comment: comment.trim() });

  req.flash("success", "Review updated.");
  res.redirect(`/vehicle/${review.vehicleId}`);
}

async function removeReview(req, res) {
  const reviewId = req.params.id;
  const review = await getReviewById(reviewId);

  if (!review || review.userId !== req.session.user.id) {
    req.flash("error", "You cannot delete this review.");
    return res.redirect("/");
  }

  await deleteReview(reviewId);

  req.flash("success", "Review deleted.");
  res.redirect(`/vehicle/${review.vehicleId}`);
}

export { submitReview, buildEditReview, submitEditReview, removeReview };