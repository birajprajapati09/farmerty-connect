
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters' }),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  unit: z.string().min(1, { message: 'Unit is required (e.g., kg, bunch, each)' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL' }).optional().or(z.literal('')),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect non-farmers away from this page
  if (user?.role !== 'farmer') {
    navigate('/');
    toast.error('Only farmers can add products');
    return null;
  }
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: '',
      unit: '',
      description: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would save to a database
      // For this mock version, we'll just use localStorage
      const productsInStorage = localStorage.getItem('farmerty_products');
      const products = productsInStorage ? JSON.parse(productsInStorage) : [];
      
      const newProduct = {
        id: Math.random().toString(36).substring(2, 15),
        name: values.name,
        price: parseFloat(values.price),
        unit: values.unit,
        description: values.description,
        imageUrl: values.imageUrl || '/placeholder.svg',
        farmerId: user?.id,
        farmerName: user?.name,
        createdAt: new Date().toISOString(),
      };
      
      products.push(newProduct);
      localStorage.setItem('farmerty_products', JSON.stringify(products));
      
      toast.success('Product added successfully!');
      navigate('/browse');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while adding your product';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-lg mx-auto p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-farmgreen-800">Add New Product</h1>
            <p className="text-muted-foreground mt-2">List your produce for consumers to buy</p>
          </div>

          {error && (
            <Alert className="mb-6 border-destructive/50 text-destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Organic Tomatoes" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="text"
                          placeholder="e.g. 3.99" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. kg, bunch, each" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your product, including any growing methods, freshness, etc." 
                        className="resize-none min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-farmgreen-500 hover:bg-farmgreen-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AddProduct;
