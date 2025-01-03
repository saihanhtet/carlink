import GuestLayout from '@/Layouts/GuestLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CarSearchTools from './CarSearchTools'

const ForSale = () => {
  return (
    <GuestLayout>
      <section className="container mx-auto flex justify-between items-center p-4 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-6 rubik font-2xl font-bold">Cars For Sale</h2>

          <Tabs defaultValue="make" className="max-w-screen-xl w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="make">Make</TabsTrigger>
            </TabsList>
            <TabsContent value="make">
              <Card>
                <CardHeader>
                  <CardTitle className="rubik font-xl font-bold">Make</CardTitle>
                  <CardDescription>
                    The body type of car that you want.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CarSearchTools />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </GuestLayout>
  )
}

export default ForSale
