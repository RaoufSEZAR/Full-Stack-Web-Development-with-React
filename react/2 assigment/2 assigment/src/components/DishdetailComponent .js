import React from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function renderDish(dish) {
	if (dish != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg top width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>
							<h4> {dish.name}</h4>
						</CardTitle>
						<CardText> {dish.description} </CardText>
					</CardBody>
				</Card>
			</div>
		);
	} else {
		return <div></div>;
	}
}

function renderComments(comments) {
	if (comments != null) {
		const renderTheComments = comments.map((comment) => {
			return (
				<li key={comment.id}>
					<p>{comment.comment}</p>
					<p>
						-- {comment.author},{" "}
						{new Intl.DateTimeFormat("en-US", {
							year: "numeric",
							month: "short",
							day: "2-digit",
						}).format(new Date(Date.parse(comment.date)))}
					</p>
				</li>
			);
		});
		return (
			<div className="col-12 col-md-5 m-1">
				<h4> Comments </h4>
				<ul className="list-unstyled"> {renderTheComments}</ul>
			</div>
		);
	} else {
		return <div></div>;
	}
}

const DishDetail = (props) => {
	const dish = props.dish;
	const comments = props.comments;

	if (dish == null) {
		return <div></div>;
	}

	const dishItem = renderDish(dish);
	const dishComment = renderComments(comments);

	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/menu">Menu</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>
			</div>
			<div className="row mb-3">
				{dishItem}
				{dishComment}
			</div>
		</div>
	);
};
// }

export default DishDetail;
