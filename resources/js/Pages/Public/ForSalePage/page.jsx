import GuestLayout from '@/Layouts/GuestLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CarSearchTools from './CarSearchTools'
import YourGarageSection from './YourGarage'
import { usePage } from '@inertiajs/react'

const ForSale = ({ canLogin, canRegister, isLoggedIn }) => {
  const { cars, brands, fuels } = usePage().props;
  return (
    <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
      <section className="container mx-auto flex justify-between items-center p-4 py-10">
        <div className="container mx-auto space-y-8">
          {/* <h2 className="text-3xl mb-6 rubik font-2xl font-bold">Cars For Sale</h2> */}

          <Tabs defaultValue="make" className="max-w-screen-xl w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="make">Make</TabsTrigger>
            </TabsList>
            <TabsContent value="make">
              <Card className='rounded-md bg-inherit border-none shadow-md'>
                <CardHeader>
                  <CardTitle className="rubik font-xl font-bold">Filter Cars</CardTitle>
                  <CardDescription>
                    The body type of car that you want.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CarSearchTools brands={brands} fuels={fuels} cars={cars} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <YourGarageSection />
        </div>
      </section>
    </GuestLayout>
  )
}

export default ForSale
