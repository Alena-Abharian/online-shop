import React, {useContext, useState} from 'react';
import './Auth.css'
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {login, registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const click = async () => {
        try{
            if (isLogin) {
                await login(email, password);
            } else {
                await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
        }


    return (
        <Container className="auth">

            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="form">
                <Form.Control
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                className="mt-3"
                placeholder="Введите ваш email..."
                />
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                    />
                    <Row className="btn">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }

                        <Button
                            className="align-self-end"
                            variant={"outline-dark"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>

        </Container>
    );
});

export default Auth;