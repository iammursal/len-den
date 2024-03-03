'use client'
import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Slider } from "@/components/ui/slider"
import { isSettledOptions } from './constants'
import { useFilterForm, useFilterFormState } from './hooks'


export const FilterForm = () => {
    const { form, onReset, onSubmit } = useFilterForm()
    const { usersOptions } = useFilterFormState()
    const amount_range = form.watch('amount_range')
    const arDefault = [amount_range?.from || 0, amount_range?.to || 100]

    console.log("🚀 ~ FilterForm ~ amount_range:", amount_range)

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6 text-start"
            >
                <Field
                    form={form}
                    label="Is Settled"
                    type="select"
                    name="is_settled"
                    options={isSettledOptions}
                    required
                />
                <Field
                    form={form}
                    label="User"
                    type="select"
                    name="user_id"
                    placeholder="Select a user"
                    options={usersOptions}
                    isSearchable={true}
                />
                <Field
                    form={form}
                    label="Date from"
                    type="date-range"
                    name="date_range"
                    mode="range"
                />
                <div className="grid grid-cols-2 gap-2">
                    <Label className='col-span-2 mb-2'>Amount Range</Label>
                    <Field
                        form={form}
                        inputMode='numeric'
                        type="text"
                        name="amount_range[from]"
                        placeholder='From'
                    />
                    <Field
                        form={form}
                        inputMode='numeric'
                        type="text"
                        name="amount_range[to]"
                        placeholder='To'
                    />
                    <div className="col-span-2">
                        <Slider
                            key={amount_range?.from}
                            defaultValue={arDefault}
                            min={1}
                            max={100}
                            step={3}
                            minStepsBetweenThumbs={1}
                            onValueCommit={(value) => {
                                // @ts-ignore
                                form.setValue('amount_range[from]', value?.[0]);
                                // @ts-ignore
                                form.setValue('amount_range[to]', value?.[1]);
                            }}
                        />
                    </div>
                </div>
                <DialogTrigger className="w-full flex gap-4 pt-6">
                    <Button
                        type="submit"
                        variant="success"
                        className="w-1/2 w-md-auto"
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        onClick={onReset}
                        variant="destructive"
                        className="w-1/2 w-md-auto"
                    >
                        Reset
                    </Button>
                </DialogTrigger>
            </form>
        </Form>
    )
}
