import { Box, Checkbox, FormControlLabel, Typography, Grid } from '@mui/material'
export default function SelectParameter({value,setFunction}){

    const handleParameters = (event) => {
        if (event.target.checked) {
            //console.log([...value])

            setFunction([...value, event.target.name])
            console.log(`按新${value}`)
        } else {
            console.log(event.target.name)
            setFunction(value.filter(ele => ele !== event.target.name))
            console.log(`新${value}`)
        }
      }
    const varList = {
        'Sal': {
          name: 'Salinity',
          code: 'Salinity',
          unit: '(psu)'
        },
        'DO': {
          name: 'Dissolved Oxygen',
          code: 'D.O.',
          unit: '(\u00B5M)'
        },
        'NO3': {
          name: 'Nitrate',
          code: 'NO3',
          unit: '(\u00B5M)'
        },
        'NO2': {
          name: 'Nitrite',
          code: 'NO2',
          unit: '(\u00B5M)'
        },
        'PO4': {
          name: 'Phosphate',
          code: 'PO4',
          unit: '(\u00B5M)'
        },
        'SiOx': {
          name: 'Silicate',
          code: 'Silicate',
          unit: '(\u00B5M)'
        },
        'NH4': {
          name: 'Ammonium',
          code: 'NH4',
          unit: '(\u00B5M)'
        },
        'Chl': {
          name: 'Chlorophyll a',
          code: 'Chlorophyll a',
          unit: '(\u00B5g/l)'
        },
        'POC': {
          name: 'Particulate Organic Carbon',
          code: 'POC',
          unit: '(\u00B5g/l)'
        },
        'PON': {
          name: 'Particulate Organic Nitrogen',
          code: 'PON',
          unit: '(\u00B5g/l)'
        },
        'DOC': {
          name: 'Dissolved Organic Carbon',
          code: 'DOC',
          unit: '(\u00B5g/l)'
        },
        'DIC': {
          name: 'Dissolved Inorganic Carbon',
          code: 'DIC',
          unit: '(\u00B5mol/kg)'
        },
        'pH_NBS': {
          name: 'pH',
          code: 'pH(NBS)',
          unit: ''
        },
        'pH_total': {
          name: 'pH',
          code: 'pH(total)',
          unit: ''
        },
        'Alk': {
          name: 'Total Alkalinity',
          code: 'Total alkalinity',
          unit: '(\u00B5mol/kg)'
        },
      }
    return(
        <Box sx={{ px: 2, py: 1 }}>
             <Typography variant="subtitle2" gutterBottom>
             Parameters
        </Typography>
        <Grid container columns={12} sx={{ width: 340}}>
          {Object.keys(varList).map((key, id) => {
            const item = varList[key];
            return (
              <Grid item sm={6} key={id}>
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox size='small' onChange={handleParameters} name={item.code} />
                   
                  }
                  label={<Typography variant='caption' sx={{ width: 135 }}>{item.name} {item.unit}</Typography>}
                />
              </Grid>
            )
          })}
        </Grid>
        </Box>
    );
}