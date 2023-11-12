import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 78,

    [theme.breakpoints.up("sm")]: {
      paddingBottom: 5,
    },
  },
}))

type Props = {
  className?: string
  children: React.ReactNode
}

export function FormControl({ className, children, ...props }: Props) {
  const classes = useStyles()

  return (
    <div {...props} className={clsx(classes.root, className)}>
      {children}
    </div>
  )
}
