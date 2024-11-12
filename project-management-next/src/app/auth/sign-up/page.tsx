import { Background, Container, SignUpForm, Wrapper } from "@/components"
import { Particles } from "@/components/ui/particles";
import { Suspense } from "react";

const SignUpPage = () => {
    return (
        <Background>
            <Container>
                <Wrapper className="relative flex flex-col mx-auto md:flex-row justify-center items-center overflow-hidden min-h-screen">
                    <Particles
                        className="absolute inset-0 w-full h-full -z-10"
                        quantity={80}
                        ease={20}
                        color="#d4d4d8"
                        refresh
                    />
                    <Suspense>
                        <SignUpForm />
                    </Suspense>
                </Wrapper>
            </Container>
        </Background>
    )
}

export default SignUpPage;