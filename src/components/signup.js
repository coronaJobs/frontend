// React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// Apollo & GraphQL
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations/users';
import { IS_LOGGED_IN } from '../graphql/queries/inner_queries';

// Custom Hooks
import { useLogin } from '../hooks';


export default function SignUpComponent() {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(1);
  const [resume, setResume] = useState();
  const [validationError, setValidationError] = useState('');

  const { register, handleSubmit, errors, formState } = useForm();
  // Read the formState before render to subscribe the form state through Proxy
  const { touched } = formState;

  const [userCreated, setUserCreated] = useState(false);
  useLogin(mail, password, userCreated);

  const { data } = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = data;

  const [signUp] = useMutation(CREATE_USER, {
    onCompleted() {
      setUserCreated(true);
      //TODO: post cv to url returned by mutation 
    },
    onError() {
      setValidationError('Error. Por favor inténtelo de nuevo.')
    }});

  // TODO: obtener roles (lista de roles) (no esta listo en backend)

  const validateForm = () => {
    signUp({ variables: { 
      name: name,
      rut: rut,
      mail: mail,
      password: password,
      address: address,
      phone: phone,
      role: role,
      resumeUrl: resume,
    }})
  }

  console.log(errors);

  return(
    !isLoggedIn ? (
      <div className="signup-background">
        <div className="signup-form-container">
          <h1>Regístrate</h1>
          <p id="signup-error-message">{validationError}</p>
          <Form onSubmit={handleSubmit(validateForm)}>
            <Form.Group>
              <Form.Control
                name='name'
                type='name'
                ref={register({required: 'Nombre requerido'})}
                placeholder="Nombre"
                onChange={(event)=>setName(event.target.value)}
                className="signup-text-input"
                isInvalid={(touched.name && name === '') || (errors.name)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name ? errors.name.message : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="rut"
                ref={register({
                  required: "Rut requerido",
                  pattern: {
                    value: /^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/,
                    message: 'Rut inválido'
                  }
                })}
                type="rut"
                placeholder="Rut"
                onChange={(event)=>setRut(event.target.value)}
                className="signup-text-input"
                isInvalid={(touched.rut && rut === '') || (errors.rut)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rut ? errors.rut.message : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name='mail'
                ref={register({
                  required: 'Correo requerido',
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: 'Correo inválido',
                  },
                })}
                type="mail"
                placeholder="Correo"
                onChange={(event)=>setMail(event.target.value)}
                className="signup-text-input"
                isInvalid={(touched.mail && mail === '') || (errors.mail)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mail ? errors.mail.message : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password"
                ref={register({
                  required: 'Contraseña requerida',
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: 'Contraseña inválida. Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial.'
                  }
                })}
                type="password"
                placeholder="Contraseña"
                onChange={(event)=>setPassword(event.target.value)}
                className="signup-text-input"
                isInvalid={(touched.password && password === '') || (errors.password)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password ? errors.password.message : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="address"
                ref={register({
                  required: 'Dirección requerida',
                })}
                type="address"
                placeholder="Dirección"
                onChange={(event)=>setAddress(event.target.value)}
                className="signup-text-input"
                isInvalid={(touched.address && address === '') || (errors.address)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address ? errors.address.message : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="phone"
                ref={register({
                  required: 'Teléfono requerido',
                  pattern: {
                    // pattern original: ^\+[1-9]{1}[0-9]{3,14}$
                    value: /^\+?[0-9]{1,11}$/,
                    message: "Teléfono inválido"
                  }
                })}
                type="phone"
                placeholder="Teléfono" 
                onChange={(event)=>setPhone(event.target.value)}
                className="signup-text-input"
                isInvalid={(touched.phone && phone === '') || (errors.phone)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone ? errors.phone.message : null}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Selecciona un tipo de usuario:</Form.Label>
              <Row>
                <Col>
                  <Form.Check type="radio" label="Empleador" checked={role===1} onChange={()=>(setRole(1))} />
                </Col>
                <Col>
                  <Form.Check type="radio" label="Trabajador" checked={role===2} onChange={()=>(setRole(2))} />
                </Col>
              </Row>
            </Form.Group>
            {role && role === 2 ?
              <Form.Group>
                <Form.File
                  id="resume-file"
                  className="signup-file-input"
                  custom
                >
                  <Form.File.Input
                    name="resume"
                    ref={register({
                      pattern: {
                        value: /^.*\.(pdf|PDF)$/,
                        message: "Formato de archivo inválido."
                      }
                    })}
                    isValid={!errors.resume && resume}
                    isInvalid={!!errors.resume}
                    onChange={(e)=>{
                      const filename = e.currentTarget.value.split(/[\\,/]/).pop();
                      setResume(filename);
                    }}
                  />
                  <Form.File.Label className="signup-file-input">Curriculum</Form.File.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.resume ? `${resume} : ${errors.resume.message}` : null}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    {!errors.resume && resume ? `${resume} cargado con éxito` : null}
                  </Form.Control.Feedback>
                </Form.File>
              </Form.Group>
            : null}
            <Button
              variant="primary"
              block
              className="signup-button"
              type="submit"
            >
              Registrar
            </Button>
          </Form>
          <span><a id="signup-login-link" href='/login'>¿Ya tienes una cuenta? Ingresa aquí</a></span>
        </div>
      </div>
    ) : <Redirect to="/" />
  )
}
