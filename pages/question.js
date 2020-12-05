import {Container, Paper, Avatar, Button, Popover, Typography, makeStyles} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.css';
import {connect} from 'react-redux';
import {fetchAnswers, addAnswer, deleteAnswer, likeAnswer, dislikeAnswer, bookmarkAnswer} from '../redux/ActionCreator';

const mapStateToProps = state => {
    return{
        answers: state.answers
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAnswers: () => dispatch(fetchAnswers), 
    addAnswer: (answers, answer) => dispatch(addAnswer(answers, answer)),
    deleteAnswer: (answers, answer) => dispatch(deleteAnswer(answers, answer)),
    likeAnswer: (answers, answer) => dispatch(likeAnswer(answers, answer)),
    dislikeAnswer: (answers, answer) => dispatch(dislikeAnswer(answers, answer)),
    bookmarkAnswer: (answers, answer) => dispatch(bookmarkAnswer(answers, answer))    
})

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

function Question(props) {      

  useEffect(() => {
    props.fetchAnswers();
  }, [])  

  const [likedQuestion, setQuestionLiked] = useState(0);
  const [dislikedQuestion, setQuestionDisliked] = useState(0);
  const [bookmarkedQuestion, setQuestionBookmarked] = useState(0);

  /*Popover code*/
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //popover code material ui
  
  const [reply, setReply] = useState("none");      

  var answers = props.answers.answers.map(a => {
      let like = a.liked === 0 ? "#ccc" : "blue";
      let dislike = a.disliked === 0 ? "#ccc" : "blue";
      let bookmark = a.bookmarked === 0 ? "#ccc" : "black";            
      return(
        <div style={{marginTop: "15px"}}>
            <Paper>                
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px", marginRight: "10px", borderBottom: "solid 1px #ccc"}}>
                    <div>
                    <Avatar>{a.name.charAt(0)}</Avatar>
                    </div>  
                    <div style={{marginLeft: "10px"}}>
                        <p>{a.name}</p>
                    </div>     
                    <div style={{marginLeft: "auto"}}>
                        <i className="fa fa-bookmark" style={{marginRight: "10px", color: bookmark, cursor: "pointer"}} onClick={() => {
                            props.bookmarkAnswer(props.answers.answers, a);
                        }}></i>
                        <a style={{cursor: "pointer"}} aria-describedby={id} onClick={handleClick}>
                            <i className="fa fa-ellipsis-v"></i>
                        </a>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography} onClick={() => {
                            props.deleteAnswer(props.answers.answers, a);
                            handleClose();
                        }}>Delete Answer</Typography>
                        </Popover>                                                
                    </div>                             
                </div>
                <div style={{marginLeft: "15px", marginRight: "15px"}}>
                    <p>{a.answer}</p>
                </div>
                <div style={{marginLeft: "15px", marginRight: "15px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <i className="fa fa-thumbs-up" style={{color: like, cursor: "pointer"}} onClick={() => {
                        props.likeAnswer(props.answers.answers, a);
                    }}></i>
                    <i className="fa fa-thumbs-down" style={{marginLeft: "10px", color: dislike, cursor: "pointer"}} onClick={() => {
                        props.dislikeAnswer(props.answers.answers, a);
                    }}></i>                    
                </div>                
            </Paper>
        </div>        
      );
  })  

  var like = likedQuestion === 0 ? "#ccc" : "blue"
  var dislike = dislikedQuestion === 0 ? "#ccc" : "blue"
  var bookmark = bookmarkedQuestion === 0 ? "#ccc" : "black"

  return (
    <div style={{backgroundImage: "linear-gradient(#6f6c6f, #2c2a2c)", height: "100%"}}>
        <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
          <Container>
            <Paper>   
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px", marginRight: "10px", borderBottom: "solid 1px #ccc"}}>
                    <h1>Why are Flies so good at getting into a home through a window, but incapable at getting outside through the same or multiple windows?</h1>
                    <i className="fa fa-bookmark" style={{marginLeft: "auto", cursor: "pointer", color: bookmark}} onClick={() => {
                        if(bookmarkedQuestion === 0){
                            setQuestionBookmarked(1);
                        }
                        else{
                            setQuestionBookmarked(0);
                        }
                    }}></i>
                </div>            
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px", marginRight: "10px"}}>
                  <div>
                    <Avatar/>
                  </div>                                                            
                  <div style={{marginLeft: "15px", marginRight: "15px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p><b>CrazyScientist4</b></p>
                    <i className="fa fa-thumbs-up fa-lg" style={{color: like, marginLeft: "10px", cursor: "pointer"}} onClick={() => {
                        if(dislikedQuestion === 1){
                            setQuestionDisliked(0);
                        }
                        if(likedQuestion === 0){
                            setQuestionLiked(1);
                        }
                        else{
                            setQuestionLiked(0);
                        }
                    }}></i>
                    <i className="fa fa-thumbs-down fa-lg" style={{marginLeft: "15px", color: dislike, cursor: "pointer"}} onClick={() => {
                        if(likedQuestion === 1){
                            setQuestionLiked(0);
                        }
                        if(dislikedQuestion === 0){
                            setQuestionDisliked(1);
                        }
                        else{
                            setQuestionDisliked(0);
                        }
                    }}></i>
                    <i className="fa fa-reply fa-lg" style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => {
                        if(reply === "none"){
                            setReply("initial")
                        }
                        else{
                            setReply("none")
                        }
                    }}> Reply</i>
                  </div>                                      
                </div>                    
            </Paper>
            <Paper style={{marginTop: "10px", height: "max-content"}}>
                <div id="reply" style={{display: reply}}>
                    <div>
                        <textarea id="answer" rows={5} style={{resize: "none", display: "block", fontFamily: "Arial", margin: "auto", width: "80%"}} placeholder="Your answer"></textarea>                                                     
                    </div>
                    <div style={{margin: "auto", display: "block", width: "max-content"}}>
                        <Button variant="contained" color="primary" onClick={() => {
                            if(document.getElementById("answer").value.length != 0){
                                var doc = {
                                    "name": "John_Doe",
                                    "answer": document.getElementById("answer").value,
                                    "liked": 0,
                                    "disliked": 0,
                                    "bookmarked": 0
                                }                                                                
                                props.addAnswer(props.answers.answers, doc);
                                document.getElementById("answer").value = "";
                                setReply("none");
                            }
                        }}>Post</Button>
                        <Button variant="contained" color="secondary" style={{marginLeft: "5px"}} onClick={() => {
                            if(reply === "none"){
                                setReply("initial");
                            }
                            else{
                                setReply("none");
                            }
                        }}>Cancel</Button>
                    </div>
                </div>                                
            </Paper>
            <Container>              
                {answers}              
            </Container>
          </Container>
        </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Question); 