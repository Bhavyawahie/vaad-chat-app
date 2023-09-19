import React, { useState, useEffect, useRef } from 'react'
import {AbsoluteCenter, Box, Button, Container, Divider, Flex, Heading, Image, Input, Link as ChakraLink, Spacer, useToast, Stack, FormControl, FormLabel, FormErrorMessage, useMediaQuery, Text, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { USER_REGISTER_RESET } from '../constants/userConstants'
import GoogleSSO from '../components/GoogleSSO'
import { Link } from 'react-router-dom'

const RegisterScreen = ({ history, location }) => {
    const [isLargerThan1440] = useMediaQuery('(min-width: 1439px)')
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [onError, setOnError] = useState({
        name: false,
        email: false,
        password: false
    })
    const ref = useRef()
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    const changeHandler = (e) => {
        const { name, value } = e.target
        setInput(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const validateForm = () => {
        const errorValidation = {
            name: true,
            email: true,
            password: true
        }
        if (!input.name) {
            errorValidation.name = false;
        }
        if (!input.email) {
            errorValidation.email = false;
        }
        if (!input.password) {
            errorValidation.password = false;
        }
        return errorValidation;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const errorValidation = validateForm();

        if (errorValidation.name && errorValidation.email && errorValidation.password) {
            dispatch(register(input));
        } else {
            // Handle validation errors here (e.g., display error messages)
            if (!errorValidation.name) {
                setOnError((state) => {
                    return { ...state, ['name']: true }
                })
            }

            if (!errorValidation.email) {
                setOnError((state) => {
                    return { ...state, ['email']: true }
                })
            }

            if (!errorValidation.password) {
                setOnError((state) => {
                    return { ...state, ['password']: true }
                })
            }
        }
    }

    useEffect(() => {
        const focusInput = () => {
            ref.current.focus();
        }
        focusInput();
    }, [])

    useEffect(() => {
        if (input.name.length > 0) {
            setOnError((state) => {
                return { ...state, ['name']: false }
            })
        }
        if (input.email.length > 0) {
            setOnError((state) => {
                return { ...state, ['email']: false }
            })
        }
        if (input.password.length > 0) {
            setOnError((state) => {
                return { ...state, ['password']: false }
            })
        }
    }, [input])

    useEffect(() => {
        if (userInfo) {
            history.push('/chats')
        }
    }, [userInfo, history]);
    return (
        <>
            <Header location={location} />
            {error && (() => { toast({ position: "top-right", title: `${error}`, status: "error", isClosable: true }); dispatch({ type: USER_REGISTER_RESET }) })()}
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} justify={!isLargerThan1440 && 'center'}>
                <Flex direction='column' w={'full'} maxW={'2xl'} p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'} maxH={'xl'}>
                        <Heading fontSize={'4xl'}>Get started</Heading>
                        <Heading fontSize={'md'}>Create a new account</Heading>
                        <GoogleSSO />
                        <Box position='relative'>
                            <Divider />
                            <AbsoluteCenter bg='white' color={"grey"} px='4'>
                                or
                            </AbsoluteCenter>
                        </Box>
                        <FormControl id="name" isInvalid={onError.name}>
                            <FormLabel>Name</FormLabel>
                            <Input type="name" ref={ref} name='name' value={input.name} onChange={(e) => changeHandler(e)} />
                            {onError.name && <FormErrorMessage>Name is required.</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="email" isInvalid={onError.email}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name='email' value={input.email} onChange={(e) => changeHandler(e)} />
                            {onError.email && <FormErrorMessage>Email is required.</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="password" isInvalid={onError.password}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name='password' value={input.password} onChange={(e) => changeHandler(e)} />
                                <InputRightElement pr={2}><Button opacity="33%" size='sm' variant="ghost" _focus={{outline: 'none'}} _hover={{bg: 'inherit'}} _active={{bg: 'inherit'}} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <ViewOffIcon/> : <ViewIcon/>}</Button></InputRightElement>
                            </InputGroup>
                            {onError.password && <FormErrorMessage>Password is required.</FormErrorMessage>}
                        </FormControl>
                        <Stack spacing={6}>
                            <Button colorScheme={'cyan'} variant={'solid'} onClick={(e) => submitHandler(e)}>
                                Sign Up
                            </Button>
                            <Flex justify='center' color={'grey'}>Have an account?<Link to={'/login'}><ChakraLink color={'blackAlpha.800'}> &nbsp;Sign In Now</ChakraLink></Link></Flex>
                        </Stack>
                    </Stack>
                </Flex>
                {isLargerThan1440 && <Flex flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                        }
                    />
                </Flex>}
            </Stack>
        </>
    )
}

export default RegisterScreen
