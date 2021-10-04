/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-pascal-case */
// import React from "react";
// import {
// 	Card,
// 	CardImg,
// 	CardText,
// 	CardBody,
// 	CardTitle,
// 	Breadcrumb,
// 	BreadcrumbItem,
// } from "reactstrap";
// import { Link } from "react-router-dom";

// function renderDish(dish) {
// 	if (dish != null) {
// 		return (
// 			<div className="col-12 col-md-5 m-1">
// 				<Card>
// 					<CardImg top width="100%" src={dish.image} alt={dish.name} />
// 					<CardBody>
// 						<CardTitle>
// 							<h4> {dish.name}</h4>
// 						</CardTitle>
// 						<CardText> {dish.description} </CardText>
// 					</CardBody>
// 				</Card>
// 			</div>
// 		);
// 	} else {
// 		return <div></div>;
// 	}
// }

// function renderComments(comments) {
// 	if (comments != null) {
// 		const renderTheComments = comments.map((comment) => {
// 			return (
// 				<li key={comment.id}>
// 					<p>{comment.comment}</p>
// 					<p>
// 						-- {comment.author},{" "}
// 						{new Intl.DateTimeFormat("en-US", {
// 							year: "numeric",
// 							month: "short",
// 							day: "2-digit",
// 						}).format(new Date(Date.parse(comment.date)))}
// 					</p>
// 				</li>
// 			);
// 		});
// 		return (
// 			<div className="col-12 col-md-5 m-1">
// 				<h4> Comments </h4>
// 				<ul className="list-unstyled"> {renderTheComments}</ul>
// 			</div>
// 		);
// 	} else {
// 		return <div></div>;
// 	}
// }

// const DishDetail = (props) => {
// 	const dish = props.dish;
// 	const comments = props.comments;

// 	if (dish == null) {
// 		return <div></div>;
// 	}

// 	const dishItem = renderDish(dish);
// 	const dishComment = renderComments(comments);

// 	return (
// 		<div className="container">
// 			<div className="row">
// 				<Breadcrumb>
// 					<BreadcrumbItem>
// 						<Link to="/menu">Menu</Link>
// 					</BreadcrumbItem>
// 					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
// 				</Breadcrumb>
// 				<div className="col-12">
// 					<h3>{props.dish.name}</h3>
// 					<hr />
// 				</div>
// 			</div>
// 			<div className="row mb-3">
// 				{dishItem}
// 				{dishComment}
// 			</div>
// 		</div>
// 	);
// };
// // }

// export default DishDetail;

import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Label,
	Col,
} from "reactstrap";
import { Control } from "react-redux-form";
import { Errors, LocalForm } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
function RenderDish({ dish }) {
	if (dish != null)
		return (
			<Card>
				<CardImg top src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	else return <div />;
}

function RenderComments({ comments }) {
	if (comments != null) {
		const commetsSection = comments.map((comment) => {
			return (
				<li key={comment.id}>
					<div>{comment.comment}</div>
					<div className="mt-2 mb-2">
						-- {comment.author} ,{" "}
						{new Intl.DateTimeFormat("en-US", {
							year: "numeric",
							month: "short",
							day: "2-digit",
						}).format(new Date(Date.parse(comment.date)))}
					</div>
				</li>
			);
		});
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">{commetsSection}</ul>
				{/* <Button outline onClick={DishDetail.toggleModal}>
					<span className="fa fa-sign-in fa-lg"></span> Submit comment
				</Button> */}
			</div>
		);
	} else return <div />;
}

// const  = (props) => {

class DishDetail extends Component {
	constructor(props) {
		super(props);

		// this.toggleNav = this.toggleNav.bind(this);

		this.state = {
			// isNavOpen: false,
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}
	handleSubmit(values) {
		this.toggleModal();

		console.log("Current State is: " + JSON.stringify(values));
		alert("Current State is: " + JSON.stringify(values));
		values.preventDefault();
	}

	// console.log("dish render invoked !");

	render() {
		const dish = this.props.dish;
		const comments = dish && dish.comments;
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{this.props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={this.props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={this.props.comments} />
						<Button outline onClick={this.toggleModal}>
							<span className="fa fa-sign-in fa-lg"></span> Submit comment
						</Button>
					</div>
				</div>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={5}>
									Rating
								</Label>
								<Col md={12}>
									<Control.select
										model=".rating"
										name="rating"
										className="form-control"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>

							<Row className="form-group">
								<Label md={12} htmlFor="author">
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: "Required ",
											minLength: "Must be greater than 3 characters",
											maxLength: "Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="message" md={5}>
									Comment
								</Label>
								<Col md={10}>
									<Control.textarea
										model=".message"
										id="message"
										name="message"
										rows="6"
										className="form-control"
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={5} md={{ size: 10, offset: 2 }}>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default DishDetail;
