import { PlusIcon, XIcon } from "@heroicons/react/solid"
import { getSession, useSession } from "next-auth/client"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Hero from "../../components/Hero"
import ReactPlayer from "react-player"
import { useRouter } from "next/router"

const Show = ({ result }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/"
  const [session] = useSession()
  const [showPlayer, setShowPlayer] = useState(false)
  const router = useRouter()

  const index = result.videos.results.findIndex((el) => el.type === "Trailer")
  console.log(result)

  useEffect(() => {
    if (!session) {
      router.push("/")
    }
  }, [])
  return (
    <div>
      <Head>
        <title>{result.title || result.original_title}</title>
      </Head>
      <Header />

      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50 overflow-hidden">
          {/* image */}
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl font-bold md:text-5xl">
              {result.title || result.original_title}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5 ">
              <button className="border text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
                <img
                  src="/images/play-icon-black.svg"
                  alt="play"
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="border text-xs md:text-base bg-black/30 text-[#f9f9f9] flex items-center border-[#f9f9f9] justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt="play"
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <PlusIcon className="h-6" />
              </div>
              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>

            <p className="text-xs md:text-sm">
              {result.release_date || result.first_air_date}.{" "}
              {/* {Math.floor(result.runtime / 60)}h {result.runtime % 60}m.{" "} */}
              {result.number_of_seasons + " "}Seasons{" "}
              {result.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
          </div>

          {/* Bg overLay */}

          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
          )}

          {/* trailer */}
          <div
            className={`absolute top-3  inset-x-[7%] md:inset-x-[13%] rounder overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>

            <div className="relative pt-[56.25%] md:pt-[51%]">
              <ReactPlayer
                url={`https://youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                height="100%"
                width="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Show

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const { id } = context.query
  console.log(id)

  const request = await fetch(`
https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`).then(
    (res) => res.json()
  )

  return {
    props: {
      session,
      result: request,
    },
  }
}
