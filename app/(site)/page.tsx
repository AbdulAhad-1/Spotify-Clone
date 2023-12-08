import { Box } from "@/components/box";
import { Header } from "@/components/header";
import { ListItem } from "@/components/list-Item";

export default function Home() {
  return (
    <Box className="h-full overflow-hidden overflow-y-auto">
      <Header>
        <div>
          <h1 className="text-white font-semibold text-3xl">Welcome Back!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/liked.png" name="Liked Songs" href="" />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          List of Songs!
        </div>
      </div>
    </Box>
  )
}
