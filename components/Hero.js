import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Image from "next/image"

const Hero = () => {
  const router = useRouter()

  return (
    <section>
      <Head>
        <title>Log in | Disney+</title>
      </Head>
      <div className="relative min-h-[calc(100vh-72px)]">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
          />
          <button className="bg-blue-600 uppercase text-xl tracking-wide py-4 px-6 rounded font-extrabold w-full hover:bg-[#0485ee]">
            Get all there
          </button>
          <p className="text-xs text-center">Everything is Free!!</p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="absolute bottom-2 flex justify-center w-full text-black">
        <div
          className=" bg-[#f9f9f9] rounded px-2 py-1 flex items-center justify-center cursor-pointer"
          onClick={() => router.push("https://github.com/loadingthedev")}
        >
          <Image
            src="/images/github.png"
            width="30"
            height="20"
            objectFit="contain"
          />
          <span className="text-black uppercase font-semibold ">Github</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
