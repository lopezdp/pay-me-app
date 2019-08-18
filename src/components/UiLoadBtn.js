import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./LoaderButton.css";

export default ({isLoading, text, loadingText, className = "", disabled = false, ...props}) => <Button className={ `LoaderButton ${className}` } disabled={ disabled || isLoading } {...props}>
                                                                                                 { isLoading && <Spinner animation="grow" /> }
                                                                                                 { !isLoading ? text : loadingText }
                                                                                               </Button>;
