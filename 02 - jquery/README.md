# Esposito Ettore
## Random user generator
Esecizi di json, una libreria per il javaScript.

Questa libreria replica o aggiunge funzioni già presenti nel js, ma in maniera più
semplice e comoda.

Il comando principale è `$()` che richiede come parametro un puntatore di js, o un selettore css
(es. `$(this)`, `$("#wrapper")`) e restituisce un puntatore jquery, che è sostanzialmente un vettore di puntatori js.

Solo su questi puntatori possono essere usati i metodi jquery (es `$(this).html()`, `$(this).animation()`),
 questi metodi restituiscono un puntatore jquery, permettendo quindi di eseguire più metodi uno dopo l'altro.
